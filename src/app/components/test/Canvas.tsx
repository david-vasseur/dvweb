import React, { forwardRef } from 'react';

const Canvas = forwardRef<HTMLDivElement, {}>((props, ref) => {
    
    return (
        <div ref={ref} className="absolute top-0 left-0 w-full h-[100vh] z-0 pointer-events-none border-4 border-red-500"></div>
    )
})

Canvas.displayName = "canvas"

export default Canvas;