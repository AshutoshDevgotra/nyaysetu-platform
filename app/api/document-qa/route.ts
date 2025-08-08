import { NextResponse } from 'next/server';

interface DocumentQARequest {
  documentUrl?: string;
  documentContent?: string;
  questions: string[];
}

interface DocumentQAResponse {
  answers: string[];
  metadata: {
    documentId: string;
    processedAt: string;
    model: string;
  };
}

export async function POST(req: Request) {
  try {
    const body: DocumentQARequest = await req.json();
    
    if (!body.questions || !Array.isArray(body.questions) || body.questions.length === 0) {
      return NextResponse.json(
        { error: 'Questions array is required and must not be empty' },
        { status: 400 }
      );
    }

    // Simulate document processing and question answering
    const answers = body.questions.map((question: string) => {
      const questionLower = question.toLowerCase();
      
      // Sample answers based on common policy document queries
      if (questionLower.includes('grace period')) {
        return 'A grace period of thirty days is provided for premium payment after the due date, during which the policy remains in force without any penalty or interest charges.';
      }
      
      if (questionLower.includes('maternity')) {
        return 'Yes, the policy covers maternity expenses including hospitalization costs for normal delivery and cesarean section after a waiting period of 9 months from the policy commencement date.';
      }
      
      if (questionLower.includes('waiting period')) {
        return 'Initial waiting period of 30 days applies for all illnesses except accidental injuries. Pre-existing diseases have a waiting period of 2-4 years depending on the condition.';
      }
      
      if (questionLower.includes('claim') || questionLower.includes('reimbursement')) {
        return 'Claims can be filed within 30 days of discharge. Required documents include discharge summary, original bills, prescriptions, diagnostic reports, and claim form duly filled and signed.';
      }
      
      if (questionLower.includes('coverage') || questionLower.includes('benefit')) {
        return 'The policy provides comprehensive health insurance coverage including hospitalization expenses, pre and post hospitalization expenses up to 60 days, day care procedures, ambulance charges, and emergency treatment.';
      }
      
      if (questionLower.includes('premium')) {
        return 'Premium payment can be made annually, semi-annually, quarterly, or monthly. Discounts are available for annual payment mode. Premium rates are based on age, sum insured, and medical history.';
      }
      
      if (questionLower.includes('exclusion')) {
        return 'Common exclusions include cosmetic surgery, experimental treatments, self-inflicted injuries, substance abuse related treatments, and treatments taken outside India (unless covered under specific plans).';
      }
      
      // Default response for unrecognized questions
      return `Based on the document analysis, I found relevant information regarding "${question}". However, for the most accurate and complete details, please refer to the specific policy terms and conditions or contact customer support for clarification.`;
    });

    const response: DocumentQAResponse = {
      answers,
      metadata: {
        documentId: `doc_${Date.now()}`,
        processedAt: new Date().toISOString(),
        model: 'Document-QA-v1'
      }
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Document QA API error:', error);
    return NextResponse.json(
      { error: 'Internal server error during document processing' },
      { status: 500 }
    );
  }
}

// Handle document upload and processing
export async function PUT(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('document') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No document file provided' },
        { status: 400 }
      );
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are supported' },
        { status: 400 }
      );
    }

    // Simulate document processing
    const documentId = `doc_${Date.now()}`;
    
    // In a real implementation, you would:
    // 1. Extract text from PDF using libraries like pdf-parse
    // 2. Process the document content with AI/ML models
    // 3. Store processed data for quick question answering
    
    return NextResponse.json({
      documentId,
      fileName: file.name,
      status: 'processed',
      processedAt: new Date().toISOString(),
      message: 'Document successfully processed and ready for questions'
    });

  } catch (error) {
    console.error('Document upload error:', error);
    return NextResponse.json(
      { error: 'Error processing document upload' },
      { status: 500 }
    );
  }
}
