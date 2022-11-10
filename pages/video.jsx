import Head from 'next/head';
import ProtectedRoute from '../components/ProtectedRoute';
import VideoCapture from '../components/VideoCapture';
import DetectionToggleButton from '../components/DetectionToggleButton';
import { useRef, useEffect, useCallback, useState } from 'react';
import { start, stop, captureToCanvas } from '../logic/videoManager';
import { Button } from 'react-bootstrap';
import { videoRefAtom, canvasRefAtom } from '../logic/atoms';
import { useAtom } from 'jotai';

export default function Search() {
  const [videoRef, setVideoRef] = useAtom(videoRefAtom);
  const [canvasRef, setCanvasRef] = useAtom(canvasRefAtom);

  return (
    <>
      <Head>
        <title>Video Experiment</title>
      </Head>

      <ProtectedRoute>
        <title>Video Experiment</title>
        <Button
          variant="success"
          onClick={() => captureToCanvas(videoRef, canvasRef)}
        >
          Capture
        </Button>
        <DetectionToggleButton />
        <VideoCapture />
      </ProtectedRoute>
    </>
  );
}
