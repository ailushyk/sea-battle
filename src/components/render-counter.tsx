'use client'

import React, { Suspense, useRef } from 'react'

export function RenderCounter() {
  const rendered = useRef(0)
  rendered.current++
  return <Suspense>{`${rendered.current}`}</Suspense>
}
