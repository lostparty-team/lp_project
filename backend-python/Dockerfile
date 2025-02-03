FROM python:3.11.10

WORKDIR /app

COPY requirements.txt requirements.txt
COPY . .

RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libgeos-c1v5 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5001

CMD ["python", "app.py"]
