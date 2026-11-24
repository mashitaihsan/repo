# servers.py: every MCP server the agent can use
import os
import sys

STDIO = os.path.join(os.path.dirname(__file__), "server", "stdio")

SERVERS = {
    "random_number": {
        "command": sys.executable,
        "args": [os.path.join(STDIO, "random_number.py")],
        "transport": "stdio",
    },
    "roll_dice": {
        "url": "http://localhost:8000/mcp",
        "transport": "streamable_http",
    },
    "tavily": {
        "url": "https://mcp.tavily.com/mcp/",
        "transport": "streamable_http",
        "headers": {"Authorization": f"Bearer {os.getenv('TAVILY_API_KEY')}"},
    },
    "postgres": {
        "command": sys.executable,
        "args": [os.path.join(STDIO, "postgres_server.py")],
        "transport": "stdio",
    },
}