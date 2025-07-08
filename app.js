const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();
const cors = require('cors');
app.use(cors());

app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Quiz Game API is running');
});

// Helper: get or create user section progress
async function getOrCreateSectionProgress(userId, sectionId) {
  let progress = await prisma.user_section_progress.findUnique({
    where: { userId_sectionId: { userId, sectionId } },
  });
  if (!progress) {
    progress = await prisma.user_section_progress.create({
      data: { userId, sectionId, unlocked: true },
    });
  }
  return progress;
}

// Initialize user and unlock section 1
app.post('/user', async (req, res) => {
  const { name, email } = req.body;
  try {
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({ data: { name, email } });
      // Unlock section 1
      const section1 = await prisma.section.findUnique({ where: { number: 1 } });
      if (section1) {
        await prisma.user_section_progress.create({
          data: { userId: user.id, sectionId: section1.id, unlocked: true },
        });
      }
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get current unlocked section and its questions for a user
app.get('/quiz/current', async (req, res) => {
  const { userId } = req.query;
  try {
    const progress = await prisma.user_section_progress.findFirst({
      where: { userId, unlocked: true },
      orderBy: { section: { number: 'asc' } },
      include: {
        section: {
          include: {
            questions: {
              include: { options: true },
              orderBy: { id: 'asc' },
            },
          },
        },
      },
    });
    if (!progress) return res.status(404).json({ error: 'No unlocked section found' });
    res.json(progress.section);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit an answer to a question
app.post('/quiz/answer', async (req, res) => {
  const { userId, questionId, selected } = req.body;
  try {
    const question = await prisma.question.findUnique({ where: { id: questionId } });
    if (!question) return res.status(404).json({ error: 'Question not found' });
    const isCorrect = question.answer === selected;
    // Record the answer
    await prisma.user_answer.create({
      data: { userId, questionId, selected, isCorrect },
    });
    // Update XP if correct
    if (isCorrect) {
      const sectionId = question.sectionId;
      const progress = await prisma.user_section_progress.update({
        where: { userId_sectionId: { userId, sectionId } },
        data: { xp: { increment: question.xp } },
      });
      // Unlock next section if XP reaches 100
      if (progress.xp + question.xp >= 100) {
        const section = await prisma.section.findUnique({ where: { id: sectionId } });
        const nextSection = await prisma.section.findUnique({ where: { number: section.number + 1 } });
        if (nextSection) {
          await getOrCreateSectionProgress(userId, nextSection.id);
        }
      }
    }
    res.json({ correct: isCorrect });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all questions with options and section info
app.get('/questions', async (req, res) => {
  try {
    const questions = await prisma.question.findMany({
      include: {
        options: true,
        section: true,
      },
    });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all sections with questions and options
app.get('/sections', async (req, res) => {
  try {
    const sections = await prisma.section.findMany({
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });
    res.json(sections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Quiz game server running on port http://localhost:${PORT}`);
}); 