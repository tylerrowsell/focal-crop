import React from 'react';
import { FocalImage } from '../../objects';
import { CroppedImage } from './components';

export interface SampleCropCardProps {
  image: FocalImage;
}

export function SampleCropCard({image}: SampleCropCardProps) {
  return <>
    <CroppedImage name="1:1 Aspect Ratio" image={image} requestedWidth={200} requestedHeight={200} />
    <CroppedImage name="1:1 Aspect Ratio" image={image} requestedWidth={500} requestedHeight={500} />
    <CroppedImage name="Hero Image" image={image} requestedWidth={1000} requestedHeight={200} />
    <CroppedImage name="Hero Image" image={image} requestedWidth={1000} requestedHeight={300} />
    <CroppedImage name="Hero Image" image={image} requestedWidth={1000} requestedHeight={500} />
    <CroppedImage name="Vertical Banner" image={image} requestedWidth={200} requestedHeight={500} />
    <CroppedImage name="Vertical Banner" image={image} requestedWidth={300} requestedHeight={500} />
  </>
}