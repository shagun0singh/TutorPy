#!/bin/bash
set -e

echo "Installing frontend dependencies..."
cd frontend-react
npm install
cd ..

echo "Installing backend dependencies..."
cd backend
npm install
cd ..

echo "Installation complete!"
