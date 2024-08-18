from flask import Flask, request, jsonify
from bs4 import BeautifulSoup
import requests


def fetch_url(url):
    response = requests.get(url)
    if response.status_code != 200:
        raise Exception(f"Failed to load page {url}")
    return response

def find_manga_URL(manga_title):
    search_url = f"https://manganato.com/search/story/{manga_title.replace(' ', '_')}"
    response = fetch_url(search_url)

    soup = BeautifulSoup(response.content, 'html.parser')
    manga_found = soup.find('a', class_='item-img bookmark_check')
    
    if not manga_found:
        raise Exception(f"No manga found called {manga_title}")

    manga_URL = manga_found['href']
    return manga_URL

def get_manga_information(manga_title):
    manga_URL = find_manga_URL(manga_title)
    response = requests.get(manga_URL)

    # Check for failed website connection
    if response.status_code != 200:
        raise Exception(f"Failed to load page {manga_URL}")
    
    #Get relevant website information
    soup = BeautifulSoup(response.content ,'html.parser')
    manga_panel = soup.find('div', 'panel-story-info')

    official_title = manga_panel.find('h1').text.strip()
    alternate_titles = manga_panel.find('h2').text.strip()
    
    genres = manga_panel.find_all('a', class_='a-h')
    genres = [genre.text for genre in genres[1:]] 

    latest_chapter = soup.find('ul', class_='row-content-chapter')
    chapter_number = latest_chapter.find('a', class_='chapter-name text-nowrap').text.strip()
    release_date = latest_chapter.find('span', class_='chapter-time text-nowrap').text.strip()

    manga_image = manga_panel.find('img', class_='img-loading')['src']


    #Return relevent information
    manga_information = {
        'title': official_title,
         'alternateTitles': alternate_titles, 
        'genres': genres,
        'imageLink': manga_image,
        'latestChapter': {
            'chapterNumber': chapter_number,  
            'releaseDate': release_date
        }
    }

    return manga_information
    

app = Flask(__name__)

@app.route('/scrape', methods=['POST'])
def scrape_manga():
    data = request.get_json()
    manga_title = data.get('title')

    if not manga_title:
        return jsonify({'error': 'No manga title provided'}), 400
    
    try:
        manga_information = get_manga_information(manga_title)
        return jsonify(manga_information)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='localhost', port = 5000)