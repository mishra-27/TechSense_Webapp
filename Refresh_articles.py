#%%
import pandas as pd
import requests
import numpy as np
from bs4 import BeautifulSoup
from newspaper import Article
import re
from nltk.corpus import stopwords
from nltk.tokenize import RegexpTokenizer
from tqdm.notebook import tqdm_notebook as tqdm
# %%
def remove_duplicates(links):
    new_links=[i for n, i in enumerate(links) if i not in links[:n] and type(i)==str]
    return new_links
#%%
global new_links
global old_links
#%%
df=pd.read_json(r'./Articles 3.0.json')
old_links=[]
for i in df['url']:
        old_links.append(str(i))
print(len(old_links))
# for i in old_links:
#     print(i)
#%%
# old_links=remove_duplicates(old_links)

for i in range(2,9):
    if "https://www.gadgetsnow.com/tech-news/"+str(i) in old_links:
        old_links.remove("https://www.gadgetsnow.com/tech-news/"+str(i))

print(len(old_links))
# for i in old_links:
#     print(i)
# %%
def get_all_links(url):
    links=[]
    req = requests.get(url)
    soup = BeautifulSoup(req.text, "html.parser")
    for i in soup.find_all('a'):
        links.append(i.get('href'))
    return links
#%%
def make_lower_case(text):
    return text.lower()

# Function for removing the html tags
def remove_html(text):
    html_pattern = re.compile('<.*?>')
    return html_pattern.sub(r'', text)

def remove_stop_words(text):
    text = text.split()
    stops = set(stopwords.words("english"))
    text = [w for w in text if not w in stops]
    texts = [w for w in text if w.isalpha()]
    texts = " ".join(texts)
    return texts

# Function for removing punctuation
def remove_punctuation(text):
    tokenizer = RegexpTokenizer(r'\w+')
    text = tokenizer.tokenize(text)
    text = " ".join(text)
    return text
#%%
title=[]
text=[]
keywords=[]
summary=[]
source_url=[]
publish_date=[]
list_of_dict=[]
def get_articles(links):
    list_of_dict=[]
    for i in tqdm(links):
        data={}
        ar=Article(i, language='en')
        try:
            ar.download()
        except:
            print("URL: %s"%i,"Download error !!!")
            continue
        try:
            ar.parse()
        except:
            print("URL: %s"%i,"Parse error !!!")
            continue
        try:
            ar.nlp()
        except:
            print("URL: %s"%i,"NLP error !!!")
            continue
        data['title']=ar.title
        data['text']=ar.text
        data['url']=ar.url
        data['date']=str(ar.publish_date).split()[0]
        tmp_text=ar.text
        tmp_text=make_lower_case(tmp_text)
        tmp_text=remove_stop_words(tmp_text)
        tmp_text=remove_punctuation(tmp_text)
        tmp_text=remove_html(tmp_text)
        data['cleaned_desc']=tmp_text
        list_of_dict.append(data)
    return list_of_dict
#%%
def toi_news_extractor(link_list):
    toi_site_words=["reviews","tech-news","top-gadgets","how-to"]
    count=0
    new_links_url2=[]
    new_links=[]
    for i in range(len(link_list)):
        for keyword in toi_site_words:
            if('/'+keyword+'/' in link_list[i] and type(link_list[i])!= None):
                if("https://" not in link_list[i]):
                    new_links_url2.append("https://www.gadgetsnow.com"+link_list[i])
                else:
                    new_links_url2.append(link_list[i])
    for i in new_links_url2:
        for j in range(2,9):
            if "/tech-news/"+str(j) not in i:
                new_links.append(i)
                break
    return new_links
#%%
def toi(url):
    all_l=get_all_links(url)
    all_l=remove_duplicates(all_l)
    new_links_url=toi_news_extractor(all_l)
    new_links_url=remove_duplicates(new_links_url)
    new_links_url=get_new_urls(new_links_url, old_links)
    return new_links_url
    # get_articles(new_links_url)
#%%
def get_new_urls(url_list, old_links):
    new_urls=[]
    for i in url_list:
        found=False
        if any(i in url for url in old_links):
                found=True
        if(found==False):
            new_urls.append(i)
    return new_urls
#%%
def remove_unwanted_links(list_of_dict):
    for i in range(len(list_of_dict)):
        for j in range(2,11):
            if "https://www.gadgetsnow.com/tech-news/"+str(j) == list_of_dict[i]['url']:
                del list_of_dict[i]
    return list_of_dict

def remove_duplicate_articles(list_of_dict):
    tmp_list=[]
    for i in range(len(list_of_dict)):
        if list_of_dict[i] not in list_of_dict[i + 1:]:
            tmp_list.append(list_of_dict[i])
    list_of_dict=tmp_list
    return list_of_dict
#%%
beebom_url="https://beebom.com/category/news/"
links=get_all_links(beebom_url)
links_url1=remove_duplicates(links)
links_url1=links_url1[33:]
new_links_url1=[i for i in links_url1 if "https://beebom.com/author/" not in i]
new_links_url1=[i for i in new_links_url1 if "http://instagram.com/beebomco" not in i]
# global new_links
new_links=get_new_urls(new_links_url1,old_links)
print(len(new_links))
# for i in new_links:
#     if i in old_links:
#         print(i)
beebom_links=new_links
for i in beebom_links:
    print(i)

# %%
toi_links=toi("https://www.gadgetsnow.com/tech-news")
for i in range(2,9):
    temp_url="https://www.gadgetsnow.com/tech-news/"+str(i)
    toi_links+=toi(temp_url)

toi_links=remove_duplicates(toi_links)

new_links=sorted(new_links)
new_links=remove_duplicates(new_links)

for i in range(2,11):
    if "https://www.gadgetsnow.com/tech-news/"+str(i) in toi_links:
        toi_links.remove("https://www.gadgetsnow.com/tech-news/"+str(i))
print(len(toi_links))
for i in range(len(toi_links)):
    print(i, toi_links[i])
#%%
list_of_dict=get_articles(beebom_links)
list_of_dict+=get_articles(toi_links)
#%%
list_of_dict=remove_unwanted_links(list_of_dict)
# %%
import json
with open(r"./Articles 3.0.json", 'r') as read_file:
    all_data = json.load(read_file)
list_of_dict+=all_data

list_of_dict=remove_duplicate_articles(list_of_dict)
#%%
list_of_dict=remove_unwanted_links(list_of_dict)
#%%
with open('./Articles 3.0.json', 'w') as fout:
    json.dump(list_of_dict , fout)
#%%