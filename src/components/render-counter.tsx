'use client'

import React, { Suspense, useRef } from 'react'

export function RenderCounter({ hidden }: { hidden?: boolean }) {
  const rendered = useRef(0)
  rendered.current++

  if (hidden) {
    console.log('RenderCounter hidden: ', rendered.current)
    return null
  }

  return <Suspense>{`${rendered.current}`}</Suspense>
}
