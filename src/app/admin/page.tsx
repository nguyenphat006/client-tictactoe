'use client'

import React from 'react'

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-lg font-semibold mb-4">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-card rounded-lg shadow">
            <h3 className="font-medium mb-2">Total Users</h3>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div className="p-4 bg-card rounded-lg shadow">
            <h3 className="font-medium mb-2">Total Games</h3>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div className="p-4 bg-card rounded-lg shadow">
            <h3 className="font-medium mb-2">Active Players</h3>
            <p className="text-2xl font-bold">0</p>
          </div>
        </div>
      </section>
    </div>
  )
}
