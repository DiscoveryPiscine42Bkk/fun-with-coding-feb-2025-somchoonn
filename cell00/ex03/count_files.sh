#!/bin/bash

echo "$(find . -maxdepth 1 -type f -o -type d | wc -l)"

