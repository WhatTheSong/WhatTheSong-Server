const { Kafka } = require('kafkajs')
require("dotenv").config();

const kafkaProducer = (sender,message,receiver)=>{
    const kafka = new Kafka({
        brokers: [`${process.env.HOST_IP}:9092`],
    })
    const producer = kafka.producer()
    const run = async () => {
        await producer.connect()
        await producer.send({
            topic: process.env.KAFKA_TOPICS_TEST,
            messages:message,
        })
    }
    run().catch(e => {
        console.error(`[kafka/producer] ${e.message}`, e)
    })
}

module.exports = kafkaProducer;
