FROM python:3.9-slim

# Set the working directory in the container to /app
WORKDIR /app

RUN apt-get update && apt-get install -y \
    gcc \
    default-libmysqlclient-dev \
    pkg-config \
    netcat-openbsd

# Copy the requirements.txt file into the container at /app
COPY ./backend/requirements.txt /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
