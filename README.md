# Image generator for qa

## Introduction

I created this image generator to be able to get an image with the desired image size and dimensions to verify all necessary validations on frontend and backend (and if you are crazy you can generate images up to 1600 megabytes in size)

## Technologies

- QWIK to have perfect SEO,
- PNGJS to handle gracefully image generation,

## Important node

Technically it's using a web worker to prevent blocking the main threat and it will always download every image immediately because they are generated locally on your computer.
