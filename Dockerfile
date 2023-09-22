FROM python:3.8-slim-buster

# Set working directory
WORKDIR /app

# Copy requirements file
COPY requirements.txt .

# Install dependencies
RUN pip install -r requirements.txt

# Copy app files
COPY . .

# Expose port
EXPOSE 5000


# Start the app
CMD [ "python", "app.py" ]