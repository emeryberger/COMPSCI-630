#!/bin/bash
for fn in `cat pdfs`; do
  convert           \
   -verbose       \
   -density 150   \
   -trim          \
    $fn.pdf      \
   -quality 100   \
   -flatten       \
   -sharpen 0x1.0 \
    $fn.jpg
done
