import fetch from 'node-fetch';
import * as fs from 'fs';

fetch('https://rest.fnar.net/building/allbuildings')
    .then((response) => response.text())
    .then((data) => {
        fs.writeFile('src/assets/prun_data/buildings.json', data, (err) => {
            if (err) throw err;
            console.log("buildings.json updated");
        });
    })
    .catch((reason) => console.log("Error fetching buildings: " + reason));

fetch('https://rest.fnar.net/material/allmaterials')
    .then((response) => response.text())
    .then((data) => {
        fs.writeFile('src/assets/prun_data/materials.json', data, (err) => {
            if (err) throw err;
            console.log("materials.json updated");
        });

        let materialCategories = {};
        let materials = JSON.parse(data);
        for (const material of materials) {
            materialCategories[material.Ticker] = material.CategoryName;
        }

        fs.writeFile('src/assets/prun_data/materialCategories.json', JSON.stringify(materialCategories), (err) => {
            if (err) throw err;
            console.log("materialCategories.json updated");
        });

        let categoryCSSMap = {};
        let uniqueCategories = new Set(Object.values(materialCategories));
        for(const category of uniqueCategories) {
            categoryCSSMap[category] = category.replace(/[\(\)]/g, '').replace(/[^a-z]/g, "-");
        }

        fs.writeFile('src/assets/prun_data/categoryCSSMap.json', JSON.stringify(categoryCSSMap), (err) => {
            if (err) throw err;
            console.log("categoryCSSMap.json updated");
        });
    })
    .catch((reason) => console.log("Error fetching materials: " + reason));

fetch('https://rest.fnar.net/global/workforceneeds')
    .then((response) => response.text())
    .then((data) => {
        fs.writeFile('src/assets/prun_data/workforceNeeds.json', data, (err) => {
            if (err) throw err;
            console.log("workforceNeeds.json updated");
        });
    })
    .catch((reason) => console.log("Error fetching workforce needs: " + reason));