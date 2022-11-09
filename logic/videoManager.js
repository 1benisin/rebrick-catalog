import { useState, useEffect, useCallback } from 'react';
import { mediaDim } from './globalConfig';
import { detectingAtom } from './atoms';
import { useAtom } from 'jotai';
import { sleep } from './utils';

const detecting = false;
const mediaStream = null;

export const getMediaStream = async () => {
  if (mediaStream) return mediaStream;

  try {
    // get video devices for multiple cameras
    let devices = await navigator.mediaDevices.enumerateDevices();

    // filter for video and sort UC40M cameras first
    devices = devices
      .filter((d) => d.kind === 'videoinput')
      .sort((a, b) => {
        if (a.label.includes('FaceTime')) return 1;
        if (a.label.includes('UC40M')) return -1;
        return 0;
      });

    const requestedMedia = {
      audio: false,
      video: {
        deviceId: { exact: devices[0].deviceId },
        width: { ideal: mediaDim.width },
        height: { ideal: mediaDim.height },
      },
    };

    const stream = await navigator.mediaDevices.getUserMedia(requestedMedia);

    // log stream dimensions
    // const trackSettings = stream.getVideoTracks()[0].getSettings();
    // console.log(`${device.label} Dimensions: ${trackSettings.width} x ${trackSettings.height}`);

    mediaStream = stream;
    return mediaStream;
  } catch (err) {
    console.error('Error getting mediaStream', err);
  }
};

export const captureToCanvas = async (videoRef, canvasRef) => {
  console.log(videoRef.current);
  const canvas = canvasRef.current;
  const ctx1 = canvas.getContext('2d');
  ctx1.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
};

export const start = async () => {
  detecting = true;
  do {
    console.log('detecting');
    await sleep(1000);
  } while (detecting);
};

export const stop = () => {
  detecting = false;
};
