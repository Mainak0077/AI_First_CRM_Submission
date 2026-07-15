from app.graph import graph


class CRMAgent:

    @staticmethod
    def chat(message: str):

        response = graph.invoke(
            {
                "messages": [
                    {
                        "role": "user",
                        "content": message
                    }
                ]
            }
        )

        return response["messages"][-1].content