import datetime
import csv


# Read in a date in MM/DD/YYYY format and return a string of the form "Dayname, Month dd"
# process_date("03/13/2020") --> "Friday, March 13"
def process_date(date_str):
    date_obj = datetime.datetime.strptime(date_str, '%m/%d/%Y')
    return date_obj.strftime("%A, %B %d")




with open('header.html') as header_file:
    header = header_file.read()
with open('footer.html') as footer_file:
    footer = footer_file.read()

print(header)

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
            print(prolog_body)
            print(prolog_topic)
            print(row['paper1'])
            print(epilog_topic)
            print(epilog_body)
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
            for key in ['1', '2', '3']:
                if row['paper'+key] != "":
                    title = row['paper'+key]
                    url = row['url'+key]
                    author = row['author'+key]
                    if row['status'+key] == "review":
                        url_str = f'<a href="{url}">{title}</a>, {author} <font color="red">[review]</font><br/>'
                    elif row['status'+key] == "read":
                        url_str = f'<a href="{url}">{title}</a>, {author} [read]<br/>'
                    elif row['status'+key] == "skim":
                        url_str = f'<a href="{url}">{title}</a>, {author} <font color="darkgreen">[skim]</font><br/>'
                    # Ignore nextyear
                    elif row['status'+key] == 'nextyear':
                        continue
                    else:
                        # Default, review
                        url_str = f'<a href="{url}">{title}</a>, {author} <font color="red">[review]</font><br/>'
                    print(url_str)
        print(epilog_body)
        print(epilog)

print(footer)
