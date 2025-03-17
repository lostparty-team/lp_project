# Base image with CUDA 11.8 and Ubuntu 20.04
FROM nvidia/cuda:11.8.0-runtime-ubuntu20.04

# Set non-interactive environment for apt-get
ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /app

# Update and install dependencies
RUN apt-get update && apt-get install -y \
    python3-pip \
    libgl1-mesa-glx \
    libgeos-c1v5 \
    libglib2.0-0 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip
RUN python3 -m pip install --upgrade pip

# Copy and install Python dependencies
COPY requirements.txt requirements.txt
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 5001

# Run the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "5001", "--reload"]