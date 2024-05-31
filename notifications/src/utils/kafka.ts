import { Kafka } from "kafkajs";

const brokers = ["localhost:19092"];

const topics = ["message-created"] as const;

const kafka = new Kafka({
    clientId: "notifications-service",
    brokers,
});

const consumer = kafka.consumer({
    groupId: "notifications-service",
});

function messageCreatedHandler(data) {
    console.log("Got a new message! ", JSON.stringify(data, null, 2));
}

const topicToSubscribe: Record<typeof topics[number], Function> = {
    "message-created": messageCreatedHandler
}

export async function connectConsumer() {
    await consumer.connect();
    console.log("Connected to consumer");

    for(let i = 0; i < topics.length; i++) {
        await consumer.subscribe({
            topic: topics[i],
            fromBeginning: true,
        });
    };

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if (!message || !message.value) {
                return;
            }

            // convert JS Object to string, then to JSON
            const data = JSON.parse(message.value.toString());

            // Get the handler for the particular topic
            const handler = topicToSubscribe[topic];

            if (handler) {
                handler(data);
            }
        }
    })
};

export async function disconnectConsumer() {
    await consumer.disconnect();
    console.log("Disconnected from consumer.")
}