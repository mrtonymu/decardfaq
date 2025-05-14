import React from 'react';

export const Card = ({ children }) => <div className='border rounded shadow-sm'>{children}</div>;
export const CardContent = ({ children, className }) => <div className={className}>{children}</div>;