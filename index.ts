import nodemailer from 'nodemailer'
import { email } from './email'
import { profiles } from './profiles'

console.log("Hello via Bun!");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 456,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: email.username,
    pass: email.password,
  },
});

export interface Profile {
  name: string;
  email: string;
}

export interface Result {
  name: string;
  email: string;
  buddy: string;
}

export const reArrange = (profiles: Profile[]): Result[] => {
  if (profiles.length === 0) {
    return [];
  }

  // Clone the profiles array to avoid modifying the original array
  const shuffled = [...profiles];

  // Fisher-Yates shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Ensure no one is their own buddy
  for (let i = 0; i < profiles.length; i++) {
    if (profiles[i].name === shuffled[i].name) {
      // If the buddy assignment has a match, swap with the next element (or first if at the end)
      const swapIndex = (i === profiles.length - 1) ? 0 : i + 1;
      [shuffled[i], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[i]];
    }
  }

  // Create the result with buddy assignments
  return profiles.map((person, index) => ({
    ...person,
    buddy: shuffled[index].name
  }));
}

async function sendEmail(data: Result) {
  console.log(data)
  await transporter.sendMail({
    from: 'raven.torp54@ethereal.email', // sender address
    to: data.email, // list of receivers
    subject: "Buddy Result", // Subject line
    text: "Hello world?", // plain text body
    html: `
      <b>Dear ${data.name}</b>
      <br>
      <i>Your buddy is ${data.buddy}</i>
    `, // html body
  });
  console.log('sent')
}

async function main() {
  const profiles: Profile[] = [
    { name: 'p', email: 'ak1103dev+p@gmail.com' },
    { name: 'a', email: 'ak1103dev+a@gmail.com' },
    { name: 'g', email: 'ak1103dev+g@gmail.com' },
  ];

  const result = reArrange(profiles);
  await Promise.all(result.map((r) => {
    sendEmail(r)
  }))
  console.log('success')
  // console.log(result);
}

main()
