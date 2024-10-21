import matplotlib
matplotlib.use('Agg')  # Use 'Agg' backend for non-interactive use

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import FileResponse
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import io
from fpdf import FPDF
import os

@api_view(['POST'])
def upload_file(request):
    try:
        file = request.FILES['file']
        print("File received: ", file.name)
        df = pd.read_excel(file) if file.name.endswith('.xlsx') else pd.read_csv(file)
        print("Dataframe loaded")
        df.ffill(inplace=True)
        df.drop_duplicates(inplace=True)
        summary = df.groupby('Category').agg({'Value': 'sum'}).reset_index()

        # Create the visualization
        plt.figure(figsize=(10, 6))
        sns.barplot(x='Category', y='Value', data=summary)
        plt.title('Category Value Summary')
        plt.tight_layout()
        print("Visualization created")

        # Save plot to a file
        image_path = "chart.png"
        plt.savefig(image_path)
        plt.close()
        print(f"Image saved to {image_path}")

        # Generate PDF report
        pdf = FPDF()
        pdf.add_page()
        pdf.set_font("Arial", size=12)
        pdf.cell(200, 10, txt="Data Analysis Report", ln=True, align='C')

        for _, row in summary.iterrows():
            pdf.cell(200, 10, txt=f"{row['Category']}: {row['Value']}", ln=True)
        pdf.image(image_path, x=10, y=50, w=150)
        print(f"Image embedded in PDF")

        # Write PDF to a temporary file
        temp_pdf_path = "report.pdf"
        pdf.output(temp_pdf_path)
        print("PDF generated and saved to temporary file")

        # Clean up the saved image file
        if os.path.exists(image_path):
            os.remove(image_path)
        print("Image file cleaned up")

        # Return the PDF file as a FileResponse
        response = FileResponse(open(temp_pdf_path, 'rb'), content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="report.pdf"'
        print("PDF response ready")

        # Cleanup temporary PDF file AFTER response is sent
        response['X-Sendfile'] = temp_pdf_path

        return response

    except Exception as e:
        print("Error: ", str(e))
        return Response({"error": str(e)}, status=500)
