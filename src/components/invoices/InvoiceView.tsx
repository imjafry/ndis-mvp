
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, Send, Printer, Eye } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface InvoiceItem {
  code: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  participantName: string;
  participantNdis: string;
  participantAddress: string;
  staffName: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  ndisItems: InvoiceItem[];
  notes: string;
  subtotal: number;
  gst: number;
  total: number;
}

interface InvoiceViewProps {
  invoice: Invoice;
  onClose: () => void;
}

export const InvoiceView: React.FC<InvoiceViewProps> = ({ invoice, onClose }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Implement PDF download
    console.log('Downloading PDF for invoice:', invoice.invoiceNumber);
  };

  const handleSend = () => {
    // Implement email sending
    console.log('Sending invoice via email:', invoice.invoiceNumber);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoice</h1>
          <p className="text-gray-600">{invoice.invoiceNumber}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            PDF
          </Button>
          {invoice.status === 'draft' && (
            <Button size="sm" onClick={handleSend}>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-8">
          {/* Invoice Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* From */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">From:</h3>
              <div className="text-gray-600">
                <p className="font-medium">NDIS Provider Services</p>
                <p>123 Provider Street</p>
                <p>Melbourne, VIC 3000</p>
                <p>ABN: 12 345 678 901</p>
                <p>provider@example.com</p>
                <p>(03) 9123 4567</p>
              </div>
            </div>

            {/* To */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Bill To:</h3>
              <div className="text-gray-600">
                <p className="font-medium">{invoice.participantName}</p>
                <p>NDIS: {invoice.participantNdis}</p>
                <p>{invoice.participantAddress}</p>
              </div>
              
              <div className="mt-4">
                <p><span className="font-medium">Service Provider:</span> {invoice.staffName}</p>
              </div>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div>
              <p className="text-sm text-gray-500">Invoice Date</p>
              <p className="font-medium">{invoice.issueDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Due Date</p>
              <p className="font-medium">{invoice.dueDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <Badge className={getStatusColor(invoice.status)}>
                {invoice.status.toUpperCase()}
              </Badge>
            </div>
          </div>

          {/* Line Items */}
          <div className="mb-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>NDIS Code</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead className="text-right">Rate</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice.ndisItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono text-sm">{item.code}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">${item.rate.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-medium">${item.amount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-64 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span>${invoice.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GST (10%):</span>
                <span>${invoice.gst.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>${invoice.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="mb-8">
              <h4 className="font-semibold text-gray-900 mb-2">Notes:</h4>
              <p className="text-gray-600">{invoice.notes}</p>
            </div>
          )}

          {/* Footer */}
          <div className="border-t pt-6 text-sm text-gray-500">
            <p className="mb-2">Payment Terms: Net 30 days</p>
            <p>Thank you for choosing our NDIS services. For any queries regarding this invoice, please contact us at accounts@example.com</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
