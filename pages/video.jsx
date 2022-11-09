import Head from 'next/head';
import ProtectedRoute from '../components/ProtectedRoute';
import VideoCapture from '../components/VideoCapture';
import ButtonToggle from '../components/ButtonToggle';
import { useRef, useEffect, useCallback } from 'react';
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
        <Button onClick={() => captureToCanvas(videoRef, canvasRef)}>
          Capture
        </Button>
        <ButtonToggle text="toggle" toggleOn={start} toggleOff={stop} />
        <VideoCapture />
      </ProtectedRoute>
    </>
  );
}
