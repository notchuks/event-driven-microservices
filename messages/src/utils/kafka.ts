import { Kafka } from "kafkajs";

const brokers = ["localhost:19092"];

const kafka = new Kafka({
    clientId: 'messages-app',
    brokers,
});

const producer = kafka.producer();

export async function connectProducer() {
    await producer.connect();
    console.log("Producer connected.")
};

export async function disconnectFromProducer() {
    await producer.disconnect();
    console.log("Producer disconnected.");
};

const topics = ["message-created"] as const;

export async function sendMessage(topic: typeof topics[number], message: any) {

    return producer.send(({
        topic,
        messages: [
            { value: message }
        ]
    }))
};