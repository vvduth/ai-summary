import { getSummaryById } from '@/components/summaries/summary';
import { notFound } from 'next/navigation';
import React from 'react'

const SummaryPage = async ({params}: {
    params: Promise<{ id: string }>
}) => {
    const {id} = await params;
    const summary = await getSummaryById(id);
    if (!summary) {
      notFound();
    }
  return (
    <div>
      
    </div>
  )
}

export default SummaryPage
