"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startConsumer = void 0;
const email_config_1 = __importDefault(require("./email.config"));
const amqplib_1 = __importDefault(require("amqplib"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sendEmail = (emailData) => __awaiter(void 0, void 0, void 0, function* () {
    yield email_config_1.default.sendMail({
        from: process.env.EMAIL_USER,
        to: emailData.to,
        subject: emailData.subject,
        text: emailData.text,
    });
    console.log(`Email sent to ${emailData.to}`);
});
const startConsumer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!process.env.RABBITMQ_URL) {
            throw new Error('RabbitMQ URL is not defined in env');
        }
        const connection = yield amqplib_1.default.connect(process.env.RABBITMQ_URL);
        const channel = yield connection.createChannel();
        const queue = 'emailQueue';
        yield channel.assertQueue(queue, { durable: true });
        channel.consume(queue, (msg) => __awaiter(void 0, void 0, void 0, function* () {
            if (msg !== null) {
                const emailData = JSON.parse(msg.content.toString());
                yield sendEmail(emailData);
                channel.ack(msg);
            }
        }));
        console.log('Waiting for messages...');
    }
    catch (error) {
        console.error('Error consuming messages:', error);
    }
});
exports.startConsumer = startConsumer;
