import React from 'react';
import { jsPDF } from 'jspdf';
import { useTimeStore } from '../store/timeStore';
import { format } from 'date-fns';

export function Invoices() {
  const { timeEntries, projects } = useTimeStore();

  const generateInvoice = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    const entries = timeEntries.filter((e) => e.projectId === projectId && e.billable);
    
    const doc = new jsPDF();
    
    // Add invoice content
    doc.text(`Invoice for ${project?.name}`, 20, 20);
    doc.text(`Generated: ${format(new Date(), 'MM/dd/yyyy')}`, 20, 30);
    
    let y = 50;
    entries.forEach((entry) => {
      doc.text(
        `${format(entry.startTime, 'MM/dd/yyyy')} - ${entry.description} - ${
          entry.duration ? entry.duration / 3600 : 0
        } hours`,
        20,
        y
      );
      y += 10;
    });
    
    const totalHours = entries.reduce((acc, entry) => acc + (entry.duration || 0), 0) / 3600;
    const totalAmount = totalHours * (project?.rate || 0);
    
    doc.text(`Total Hours: ${totalHours.toFixed(2)}`, 20, y + 10);
    doc.text(`Total Amount: $${totalAmount.toFixed(2)}`, 20, y + 20);
    
    doc.save(`invoice-${project?.name}-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Invoices</h1>
      
      <div className="grid gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{project.name}</h2>
                <p className="text-gray-600">Client: {project.client}</p>
              </div>
              <button
                onClick={() => generateInvoice(project.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Generate Invoice
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}