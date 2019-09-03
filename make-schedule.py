import datetime
import csv


# Read in a date in MM/DD/YYYY format and return a string of the form "Dayname, Month dd"
# process_date("03/13/2020") --> "Friday, March 13"
def process_date(date_str):
    # date_str = "6/13/2018"
    date_obj = datetime.datetime.strptime(date_str, '%m/%d/%Y')
    #year = date_obj.date().year
    #month = date_obj.date().month
    #day = date_obj.date().day
    # x = datetime.datetime(year, month, day)
    return date_obj.strftime("%A, %B %d")

with open('header.html') as header_file:
    header = header_file.read()
with open('footer.html') as footer_file:
    footer = footer_file.read()

print(header)

# print(process_date("03/13/2020"))

prolog = '<div class="card mb-12">'
          
prolog_header = '<div class="card-header"><h4 id="users" class="my-0 font-weight-normal">'
epilog_header = '</h4></div>'
prolog_topic = '<h5><em>'
epilog_topic = '</em></h5>'
prolog_body = '<div class="card-body">'
epilog_body = '</div>'

epilog = '</div>'

with open('schedule.csv') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        print(prolog)
        if row['type'] == 'exam':
            print(prolog_header)
            print('<font color="red">')
            print(process_date(row['date']))
            print(f" &mdash; {row['topic'].capitalize()}")
            print('</font>')
            print(epilog_header)
            continue
            
        if row['type'] == 'noclass':
            print(prolog_header)
            print('<font color="red">')
            print(process_date(row['date']))
            print(" &mdash; no class")
            print('</font>')
            print(epilog_header)
            continue
        
        if row['type'] == 'class':
            print(prolog_header)
            date = row['date']
            if date == "":
                print("TBD")
            else:
                print(process_date(row['date']))
            print(epilog_header)
            print(prolog_body)
            print(prolog_topic)
            topic = f"{row['topic'].title()}"
            print(topic)
            print(epilog_topic)
            if row['paper1'] != "":
                title = row['paper1']
                url = row['url1']
                author = row['author1']
                url_str = f'<a href="{url}">{title}</a>, {author}<br/>'
                print(url_str)
            if row['paper2'] != "":
                title = row['paper2']
                url = row['url2']
                author = row['author2']
                url_str = f'<a href="{url}">{title}</a>, {author}<br/>'
                print(url_str)
            if row['optionalpaper1'] != "":
                title = row['optionalpaper1']
                url = row['optionalurl1']
                author = row['optionalauthor1']
                url_str = f'<font color="darkgreen"><a href="{url}">{title}</a>, {author} [skim]<br/></font>'
                print(url_str)
            
            #print process_date(row['date'])
            #print row['topic'].title() # Capitalize every word
        print(epilog_body)
        print(epilog)

print(footer)
