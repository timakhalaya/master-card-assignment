API should response back on failure and success
- Report back on configuration validation failure
- Report back on success
- Report back on any failure when applying the configuration


I propose a hybrid approach when it comes to client talking to api and api to nodes

- TCP over sockets with event bridge 
- Kafka to handle configurations and additional things that might be useful, analytics for example.
 From Configuration Service down to nodes I would suggest using the REST communication over HTTP.

REST representing the standard for the communication over HTTP.

For zone redundancy we can have a region instances behind the load balancer handling requests from different regions.
(Kafka clusters in different zones) 

- Kafka can handle streaming data very nice , but usually we don’t consider it for request/reponse scenarios , it more of the pub/sub approach. Usually when working with Kafka we are not interested in response right away. The job can be handled at some later point in time.
- With HTTP/REST approach we have the obligation usually to respond back to the client with appropriate status and body.

If we would have a streaming data, Kafka would be beneficial.
If the client is expecting the response back at that same moment, REST is best.
With Kafka also as I mentioned , we can add more services to analyse data and etc.

And also with REST calls if the number of nodes grows then we grow the number of connections, that can be painful.
With Kafka u just add more topics.

In our case suspected that the client needs to understand wherever or not the configuration has been applied. 
And maybe if the configuration was not applied , then for what reason. 


In both scenarios also I would have back off strategies that can be configured either in REST or Async / Kafka approach.

For example : 
- REST would backoff limit , in case of request fail, do the retry and consider configured retry policy.
- With Kafka, using a dead letter queues for configurations that we were not able to apply for some reason.



