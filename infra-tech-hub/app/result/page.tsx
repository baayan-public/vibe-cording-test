import { Suspense } from 'react';
import ResultClient from './ResultClient';

export default function QuizResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultClient />
    </Suspense>
  );
}