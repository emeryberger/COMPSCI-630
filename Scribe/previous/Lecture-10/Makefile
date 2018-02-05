#adapted from http://www.fclose.com/1643/a-simple-makefile-for-latex/

SHELL=/bin/bash
FILE=Lecture-10

all: pdf
pdf:
	pdflatex ${FILE}
clean:
	rm -f ${FILE}.{pdf,log,aux,out}
