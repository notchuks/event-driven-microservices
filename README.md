# Event-driven microservices with kafka

## What are we building?
* A simple event-driven system that will allow us to send messages to kafka and then consume them

<img src="./diagram.png" width="500px" />


## Functionality
* Setup a Kafka cluster for local development with Docker
* Connect a producer to the cluster
* Connect a consumer to the cluster
* Graceful shutdown - disconnect the producer and consumer from the cluster
* Using Conduktor to view & manage the cluster