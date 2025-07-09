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
      // Check if username is already taken
      const existingName = await prisma.user.findFirst({ where: { name } });
      if (existingName) {
        return res.status(400).json({ error: 'Username already taken. Please choose another.' });
      }
      // Check if email is already taken
      const existingEmail = await prisma.user.findUnique({ where: { email } });
      if (existingEmail) {
        return res.status(400).json({ error: 'Email already registered. Please use another.' });
      }
      // Create new user
      const user = await prisma.user.create({ data: { name, email } });
      // Unlock section 1
      const section1 = await prisma.section.findUnique({ where: { number: 1 } });
      if (section1) {
        await prisma.user_section_progress.create({
          data: { userId: user.id, sectionId: section1.id, unlocked: true, xp: 0 },
        });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// Get current unlocked section and its questions for a user
// app.get('/quiz/current', async (req, res) => {
//   const { userId } = req.query;
//   try {
//     const progress = await prisma.user_section_progress.findFirst({
//       where: { userId, unlocked: true },
//       orderBy: { section: { number: 'asc' } },
//       include: {
//         section: {
//           include: {
//             questions: {
//               include: { options: true },
//               orderBy: { id: 'asc' },
//             },
//           },
//         },
//       },
//     });
//     if (!progress) return res.status(404).json({ error: 'No unlocked section found' });
//     res.json({
//         ...progress.section,
//         userXp: progress.xp
//       });  } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

app.get('/quiz/current', async (req, res) => {
  const { userId } = req.query;
  try {
    const progresses = await prisma.user_section_progress.findMany({
      where: { userId },
      include: { section: {
        include: {
          questions: {
            include: { options: true },
            orderBy: { id: 'asc' },
          },
        },
      } },
      orderBy: { section: { number: 'asc' } }
    });
    // Find the first unlocked section that is not completed
    const progress = progresses.find(p => p.unlocked && p.xp < 100);
    // If all unlocked sections are completed, show the next unlocked section (if any)
    const fallback = progresses.find(p => p.unlocked);
    if (!progress && !fallback) return res.status(404).json({ error: 'No unlocked section found' });
    const sectionToShow = progress || fallback;
    res.json({
      ...sectionToShow.section,
      userXp: sectionToShow.xp,
      sectionProgress: progresses.map(p => ({
        sectionNumber: p.section.number,
        completed: p.xp >= 100
      }))
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit an answer to a question
app.post('/quiz/answer', async (req, res) => {
  const { userId, questionId, selected } = req.body;
  try {
    // Check if already answered
    const alreadyAnswered = await prisma.user_answer.findUnique({
      where: {
        userId_questionId: { userId, questionId }
      }
    });
    if (alreadyAnswered) {
      return res.status(400).json({ error: "You have already answered this question." });
    }

    const question = await prisma.question.findUnique({ where: { id: questionId } });
    if (!question) return res.status(404).json({ error: 'Question not found' });
    // Ensure both are numbers and log for debugging
    const isCorrect = Number(question.answer) === Number(selected);
    console.log('Comparing:', question.answer, 'vs', selected, '=>', isCorrect);
    // Record the answer
    await prisma.user_answer.create({
      data: { userId, questionId, selected, isCorrect },
    });
    // Update XP if correct
    if (isCorrect) {
      const sectionId = question.sectionId;
      await prisma.user_section_progress.update({
        where: { userId_sectionId: { userId, sectionId } },
        data: { xp: { increment: question.xp } },
      });
      // Fetch updated progress
      const updatedProgress = await prisma.user_section_progress.findUnique({
        where: { userId_sectionId: { userId, sectionId } }
      });
      // Unlock next section if XP reaches 100
      if (updatedProgress.xp >= 100) {
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

// Delete a user and all their related data by email or userId
app.delete('/admin/delete-user', async (req, res) => {
  const { email, userId } = req.body;
  try {
    let user;
    if (userId) {
      user = await prisma.user.findUnique({ where: { id: userId } });
    } else if (email) {
      user = await prisma.user.findUnique({ where: { email } });
    } else {
      return res.status(400).json({ error: 'Provide email or userId' });
    }
    if (!user) return res.status(404).json({ error: 'User not found' });
    // Delete user (related data will be deleted automatically due to CASCADE)
    await prisma.user.delete({ where: { id: user.id } });
    res.json({ message: 'User and related data deleted.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Global leaderboard: top 10 users by total XP
app.get('/leaderboard', async (req, res) => {
  try {
    // Get all users and their total XP (sum of all section highscores)
    const highscores = await prisma.user_highscore.findMany({
      include: { user: true }
    });

    // Aggregate total XP per user
    const userTotals = {};
    highscores.forEach(hs => {
      if (!userTotals[hs.userId]) {
        userTotals[hs.userId] = { username: hs.user.name, xp: 0 };
      }
      userTotals[hs.userId].xp += hs.score;
    });

    // Convert to array and sort descending by XP
    const leaderboard = Object.values(userTotals)
      .sort((a, b) => b.xp - a.xp)
      .slice(0, 10);

    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit all answers for a section and upsert highscore
app.post('/quiz/submit-section', async (req, res) => {
  const { userId, sectionId, answers } = req.body;
  try {
    // Get all questions for the section
    const questions = await prisma.question.findMany({
      where: { sectionId },
      orderBy: { id: 'asc' }
    });
    // Calculate score
    let score = 0;
    const answerResults = answers.map(ans => {
      const q = questions.find(q => q.id === ans.questionId);
      const isCorrect = q && Number(q.answer) === Number(ans.selected);
      if (isCorrect) score += q.xp;
      return {
        questionId: ans.questionId,
        selected: ans.selected,
        isCorrect
      };
    });
    // Get previous highscore
    const prev = await prisma.user_highscore.findUnique({
      where: { userId_sectionId: { userId, sectionId } }
    });
    let isNewHighscore = false;
    if (!prev || score > prev.score) {
      // Upsert new highscore
      await prisma.user_highscore.upsert({
        where: { userId_sectionId: { userId, sectionId } },
        update: { score, answers: answerResults },
        create: { userId, sectionId, score, answers: answerResults }
      });
      isNewHighscore = true;
    }
    // Mark section as completed (xp=100, unlocked=true)
    await prisma.user_section_progress.upsert({
      where: { userId_sectionId: { userId, sectionId } },
      update: { xp: 100, unlocked: true },
      create: { userId, sectionId, xp: 100, unlocked: true }
    });
    // Unlock next section if it exists
    const section = await prisma.section.findUnique({ where: { id: sectionId } });
    const nextSection = await prisma.section.findUnique({ where: { number: section.number + 1 } });
    if (nextSection) {
      await prisma.user_section_progress.upsert({
        where: { userId_sectionId: { userId, sectionId: nextSection.id } },
        update: { unlocked: true },
        create: { userId, sectionId: nextSection.id, unlocked: true }
      });
    }
    res.json({ isNewHighscore, score, answerResults });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Quiz game server running on port http://localhost:${PORT}`);
}); 