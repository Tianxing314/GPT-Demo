import csv
import json

def process_csv_to_json(input_csv_path):
    output_data = []
    customized_data = []
    
    with open(input_csv_path, mode='r', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file)

        for row in csv_reader:
            json_object1 = { "messages": [{"role": "system", "content": "You are an assistant that can find profession information given a description in either English or French"},{"role": "user", "content": f"Give me the profession info with the following description: {row['description']}"},{"role": "assistant", "content": f"profession_name: {row['primaryName']}; profession_french_name: {row['primaryName_fr']}; profession_category:{row['classification']}"}]}
            json_object2 = { "messages": [{"role": "system", "content": "You are an assistant that can find profession information given a description in either English or French"},{"role": "user", "content": f"Give me the profession info with the following description: {row['description_fr']}"},{"role": "assistant", "content": f"profession_name: {row['primaryName']}; profession_french_name: {row['primaryName_fr']}; profession_category:{row['classification']}"}]}
            output_data.append(json_object1)
            output_data.append(json_object2)
            if row['primaryName']:
                 customized_data.append('"' +  row['primaryName'] + '"')
    
    with open('output.txt', 'w', encoding='utf-8') as file_out:
        for name in customized_data:
            file_out.write(name+',')
    print(customized_data)
    return output_data

json_list = process_csv_to_json('profession_data_for_public_cleaned.csv')

output_filename = 'training_data_formatted.jsonl'

# Open the file in write mode and iterate over the JSON objects
with open(output_filename, 'w', encoding='utf-8') as file_out:
    for json_obj in json_list:
        # Write each JSON object as a string to the file. 
        # The `separators` parameter removes the space after the comma.
        json_str = json.dumps(json_obj, ensure_ascii=False, separators=(',', ':'))
        
        # We are writing line by line, which inherently doesn't add commas between objects.
        file_out.write(json_str + '\n')


process_csv_to_json('profession_data_for_public_cleaned.csv')