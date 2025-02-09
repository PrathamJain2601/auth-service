import { emailData } from "../utils/email.util";
import transporter from "./email.config";
import amqp from 'amqplib';
import dotenv from 'dotenv';
dotenv.config();

const sendEmail = async (emailData: emailData) => {

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: emailData.to,
        subject: emailData.subject,
        text: emailData.text,
    });

    console.log(`Email sent to ${emailData.to}`);
};

export const startConsumer = async () => {
    try {
        if(!process.env.RABBITMQ_URL){
            throw new Error('RabbitMQ URL is not defined in env');
        }
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();
        const queue = 'emailQueue';

        await channel.assertQueue(queue, { durable: true });

        channel.consume(queue, async (msg) => {
            if (msg !== null) {
                const emailData = JSON.parse(msg.content.toString());
                await sendEmail(emailData);
                channel.ack(msg);
            }
        });

        console.log('Waiting for messages...');
    } catch (error) {
        console.error('Error consuming messages:', error);
    }
};