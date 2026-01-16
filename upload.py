import csv
import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

# Connect to database
db = mysql.connector.connect(
    host=os.getenv("DB_HOST"),
    port=int(os.getenv("DB_PORT", "19840")),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME"),
    ssl_ca="ca.pem"
)

cursor = db.cursor()

try:
    print("⚡ Clearing final_tokens and final_votes tables...")
    cursor.execute("DELETE FROM final_votes")
    cursor.execute("DELETE FROM final_tokens")
    db.commit()
    print("✅ Tables cleared.")

    print("📄 Reading tokens from Token350.csv...")
    with open("Token350.csv", "r", encoding="utf-8") as file:
        reader = csv.reader(file)
        tokens = [row[0].strip() for row in reader if row]

    print(f"🔢 Total tokens read: {len(tokens)}")
    if len(tokens) != 350:
        print("⚠️ Warning: Expected 350 tokens, but found", len(tokens))

    # Reward distribution
    reward_distribution = [
        (2, "30000MMK"),
        (5, "10000MMK"),
        (10, "5000MMK"),
        (20, "3000MMK"),
        (37, "2000MMK"),
        (276, "1000MMK")
    ]

    print("💾 Inserting tokens with rewards...")
    insert_query = "INSERT INTO final_tokens (token, reward_value) VALUES (%s, %s)"

    idx = 0
    for count, reward in reward_distribution:
        for _ in range(count):
            if idx >= len(tokens):
                break
            cursor.execute(insert_query, (tokens[idx], reward))
            idx += 1

    db.commit()
    print(f"✅ Inserted {idx} tokens successfully with reward distribution!")

except Exception as e:
    print(f"❌ Error: {e}")
    db.rollback()

finally:
    cursor.close()
    db.close()
    print("🔒 Database connection closed.")
