#!/usr/bin/env python3
"""
Generate a new Django SECRET_KEY for production use.
Run this script and copy the output to your .env file.
"""

from django.core.management.utils import get_random_secret_key

if __name__ == "__main__":
    secret_key = get_random_secret_key()
    print("New SECRET_KEY generated:")
    print(f"SECRET_KEY={secret_key}")
    print("\nCopy this to your .env file for production use.")
