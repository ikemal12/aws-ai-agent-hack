# Multi-Agent Personalized Learning Companion 

## Architecture Diagram

```text
           +-------------------+
           |  User Web App /   |
           |     Chat UI       |
           +-------------------+
                     |
                     v
           +-------------------+
           | API Gateway +     |
           |     Lambda        |
           +-------------------+
                     |
                     v
           +-------------------+
           | Bedrock AgentCore |
           |  Orchestrator     |
           +-------------------+
            /       |       \
           /        |        \
          v         v         v
+----------------+ +----------------+ +----------------+
| Instructor     | | Coach Agent    | | Tester Agent   |
| Agent          | |                | |                |
+----------------+ +----------------+ +----------------+
          |                 |                 |
          v                 v                 v
  +----------------+  +----------------+  +----------------+
  | Amazon Bedrock |  | SageMaker AI   |  | Amazon Q / S3  |
  | LLM Models     |  | (optional diff)|  | (Knowledge DB) |
  +----------------+  +----------------+  +----------------+
                     |
                     v
             +----------------+
             | DynamoDB Memory|
             | (Progress      |
             | Tracking)      |
             +----------------+
