#!/bin/bash

# IONOS SFTP Upload Script
# This will upload your built site to IONOS

HOST="access-5019436500.webspace-host.com"
PORT="22"
USER="a2708013"
LOCAL_DIR="./out"
REMOTE_DIR="/"

echo "🚀 Starting upload to IONOS..."
echo "📁 Uploading from: $LOCAL_DIR"
echo "🌐 Uploading to: $HOST$REMOTE_DIR"
echo ""

# Check if 'out' directory exists
if [ ! -d "$LOCAL_DIR" ]; then
    echo "❌ Error: ./out directory not found. Please run 'node deploy-ionos.js' first."
    exit 1
fi

# Use SFTP to upload files
# You'll be prompted for your password
sftp -P $PORT $USER@$HOST << EOF
cd $REMOTE_DIR
lcd $LOCAL_DIR
put -r *
bye
EOF

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Upload complete!"
    echo "🌐 Your site is now live at: https://overcomerglobalnetwork.com"
    echo ""
    echo "🔑 Admin Login:"
    echo "   URL: https://overcomerglobalnetwork.com/admin"
    echo "   Email: admin@overcomers.org"
    echo "   Password: OGN2026Admin!"
else
    echo ""
    echo "❌ Upload failed. Please check your password and try again."
fi
