const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const content = fs.readFileSync('questions.txt', 'utf-8');
  const lines = content.split('\n').map(line => line.trim()).filter(Boolean);

  let currentSection = null;
  let currentSectionNumber = 1;
  let sections = [];

  let i = 0;
  while (i < lines.length) {
    if (lines[i].startsWith('Section:')) {
      if (currentSection) {
        sections.push(currentSection);
      }
      currentSection = {
        title: lines[i].split(':')[1].trim(),
        number: currentSectionNumber++,
        questions: [],
      };
      i++;
    } else if (lines[i].startsWith('Q:')) {
      const questionText = lines[i].slice(2).trim();
      i++;

      const answerIndex = parseInt(lines[i].split(':')[1].trim());
      i++;

      if (lines[i] !== 'Options:') {
        throw new Error(`Missing 'Options:' line after question: "${questionText}"`);
      }
      i++;

      const options = [];
      for (let o = 0; o < 4; o++) {
        if (!lines[i]) throw new Error(`Missing option ${o + 1} for question: "${questionText}"`);
        options.push({ text: lines[i] });
        i++;
      }

      currentSection.questions.push({
        text: questionText,
        answer: answerIndex,
        options: options,
      });
    } else {
      i++;
    }
  }

  if (currentSection) {
    sections.push(currentSection);
  }

  for (const section of sections) {
    const created = await prisma.section.create({
      data: {
        title: section.title,
        number: section.number,
        questions: {
          create: section.questions.map(q => ({
            text: q.text,
            answer: q.answer,
            options: {
              create: q.options
            }
          }))
        }
      }
    });

    console.log(`✅ Created Section: ${created.title} with ${section.questions.length} questions`);
  }
}

main()
  .catch((e) => {
    console.error('❌ Error while seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
