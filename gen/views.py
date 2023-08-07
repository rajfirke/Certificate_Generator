from django.shortcuts import render, HttpResponse  # Import HttpResponse here
from PIL import Image, ImageDraw, ImageFont
import os
import zipfile
# Create your views here.
def main(request):
    return render(request, 'main.html')


# name = request.POST['fName'] + " " + request.POST['lName']

def generate_certificates(request):
    if request.method == 'POST':
        names_list = request.POST.get('names', '').split(',')
        font_size = int(float(request.POST.get('font_size', '')))  # Convert to float
        certificate = request.FILES.get('certificate')
        name_x = int(float(request.POST.get('name_x', '')))  # Convert to float and then to int
        name_y = int(float(request.POST.get('name_y', ''))) # Convert to float and then to int

        # Process the data or perform further actions
        certificate = Image.open(certificate)

        # Define the font and style to use for the names
        font_path = "arial.ttf"  # Path to the Arial font file
        font = ImageFont.truetype(font_path, font_size)

        # Define the stroke width and color
        stroke_width = 1
        stroke_color = (0, 0, 0)

        # Define a list of names to put on the certificate
        names = names_list

        # Create a list to store the filenames of the generated certificates
        generated_certificates = []

        # Create a certificate for each name in the list
        for name in names:
            # Create a new image by copying the certificate template
            certificate_with_name = certificate.copy()

            # Get the drawing context for the new image
            draw = ImageDraw.Draw(certificate_with_name)

            # Draw the outline around the text
            draw.text((name_x, name_y), name, font=font, fill=stroke_color, stroke_width=stroke_width)

            # Draw the text over the outline
            draw.text((name_x, name_y), name, font=font, fill=(0, 0, 0))

            # Generate a filename for the certificate and save it
            filename = f"{name}_certificate.png"
            certificate_with_name.save(filename)
            generated_certificates.append(filename)

        # Create a zip folder to store all the generated certificates
        zip_filename = "generated_certificates.zip"
        with zipfile.ZipFile(zip_filename, 'w') as zip_file:
            for cert_file in generated_certificates:
                zip_file.write(cert_file)

        # Serve the zip folder for download
        with open(zip_filename, 'rb') as zip_file:
            response = HttpResponse(zip_file.read(), content_type='application/zip')
            response['Content-Disposition'] = f'attachment; filename="{zip_filename}"'

        # Delete the zip folder after serving the download
        os.remove(zip_filename)

        return response
    return render(request, 'main.html')
