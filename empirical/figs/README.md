## Generating Checklist Figures

The figures in this directory are generated from a Google Presentation, which can be found [here](https://docs.google.com/presentation/d/1sdSNQTRRvSTgCUO7S4_w2oeNVIbX_SqsJvX_A-XFJ5M/edit?usp=sharing).   Converting those figures into pdfs is a little involved.   Here's the process:

#### Requirements

- You will need [rsvg-convert](https://helpmanual.io/help/rsvg-convert/), which comes with the [librsvg2-bin](https://helpmanual.io/packages/apt/librsvg2-bin/) package.
- You will need [sed](https://www.gnu.org/software/sed/manual/sed.html)
- You will need some time and patience

#### Procedure

- Create an new, empty, Google Drawing.
- From the [presentation](https://docs.google.com/presentation/d/1sdSNQTRRvSTgCUO7S4_w2oeNVIbX_SqsJvX_A-XFJ5M/edit?usp=sharing), select the figure you require, being sure to select only the frame of the figure and its contents, not the caption above or any other content, and copy the selection.
- Paste the figure into your empty Google Drawing.
- Select just the frame of the figure and change the line to transparent (don't delete the frame)
- Export the figure as an svg using `File->Download as`
- Fix the bounding box of the svg to 256x256, either by editing the file by hand or using something like `sed -i.bak 's/0.0 0.0 960.0 720.0/0.0 0.0 256.0 256.0/g' $n.svg`
- Use rsvg-convert to convert the svg to pdf, using something like `rsvg-convert -f pdf $n.svg > $n.pdf`

