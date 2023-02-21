const { Kafka, CompressionTypes, logLevel } = require('kafkajs')



module.createLikeNotification= async (sender,receiverToken) =>{
    const host = process.env.HOST_IP

    const kafka = new Kafka({
        logLevel: logLevel.DEBUG,
        brokers: [`${host}:9092`],
        clientId: 'notification-producer',
    })

    const topic = process.env.KAFKA_TOPICS
    const producer = kafka.producer()
    const msg = {
        sender:sender,
        receiverToken:receiverToken,
    }
    const sendMessage = (msg) => {
        return producer
            .send({
                topic,
                compression: CompressionTypes.GZIP,
                messages: [msg]
            })
            .then(console.log)
            .catch(e => console.error(`[notification/producer] ${e.message}`, e))
    }


    const errorTypes = ['unhandledRejection', 'uncaughtException']
    const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']

    errorTypes.forEach(type => {
        process.on(type, async () => {
            try {
                console.log(`process.on ${type}`)
                await producer.disconnect()
                process.exit(0)
            } catch (_) {
                process.exit(1)
            }
        })
    })

    signalTraps.forEach(type => {
        process.once(type, async () => {
            try {
                await producer.disconnect()
            } finally {
                process.kill(process.pid, type)
            }
        })
    })

    const run = async () => {
        await producer.connect()
        setInterval(sendMessage, 3000)
    }

    run().catch(e => console.error(`[example/producer] ${e.message}`, e))


}
