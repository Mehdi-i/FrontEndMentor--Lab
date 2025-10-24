'use strict';

const extensionsContainer = document.querySelector('.extensions__container');
const filterContainer = document.querySelector('.filter__container');

//! Send API request to the local Json file and parse the data
const extensionAPI = fetch('data.json')
    .then((response) => response.json())
    .then((data) => {
        const renderExtensions = function (extensionData) {
            extensionsContainer.innerHTML = '';
            extensionData.forEach((extension) => {
                extensionsContainer.insertAdjacentHTML(
                    'beforeend',
                    `<div class="extension" data-name ="${extension.name}">
                        <div class="extension__details">
                            <img src="${extension.logo}" alt="${
                        extension.name
                    }" />
                            <div class="extension__details--inner">
                                <h4>${extension.name}</h4>
                                <p>${extension.description}</p>
                            </div>
                        </div>
                        <div class="extension__action">
                            <button class="extension__delete" type="button">Remove</button>
                            <label class="toggle-switch">
                                <input type="checkbox" ${
                                    extension.isActive ? 'checked' : ''
                                }/>
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>`
                );
            });
        };

        renderExtensions(data);

        extensionsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('extension__delete')) {
                const deleteParent = e.target.closest('.extension');
                const deleteParentName = deleteParent.dataset.name;

                data = data.filter(
                    (extension) => extension.name !== deleteParentName
                );

                renderExtensions(data);
            }
        });

        extensionsContainer.addEventListener('change', (e) => {
            if (e.target.matches('.toggle-switch input[type="checkbox"]')) {
                const checkBox = e.target;
                const checkBoxParent = checkBox.closest('.extension');
                const checkBoxParentName = checkBoxParent.dataset.name;

                const targetExtension = data.find((extension) => {
                    return extension.name === checkBoxParentName;
                });

                if (targetExtension) {
                    targetExtension.isActive = checkBox.checked;
                }
            }
        });

        filterContainer.addEventListener('click', (e) => {
            const targetBtn = e.target.closest('.filter__btn');
            if (!targetBtn) return;

            filterContainer.querySelectorAll('.filter__btn').forEach((btn) => {
                btn.classList.remove('active');
                targetBtn.classList.add('active');
            });

            if (targetBtn.classList.contains('filter--active'))
                renderExtensions(
                    data.filter((extension) => extension.isActive)
                );
            else if (targetBtn.classList.contains('filter--inactive'))
                renderExtensions(
                    data.filter((extension) => !extension.isActive)
                );
            else {
                renderExtensions(data);
            }
        });
    })
    .catch((error) => console.error(error));
