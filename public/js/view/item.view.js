export const itemTemplate = (item) => {
    let link = item && item.url || "",
        title = item && item.title || "",
        desc = item && item.description || "",
        img = item && item.img || "";
        
    let imgTemplate = `<div class="item__wrap-img">
                            <img class="item__img" src="${img}" alt="${title}">
                        </div>`;

    let titleTemplate = `<h2 class="item__title">${title}</h2>`;

    let descTemplate = ` <p class="item__desc">${desc}</p>`;

    let template = `<div>
                        <div class="item">
                            <a class="item__link" href="${link}">${link}</a>
                            <div class="item__content">
                                ${title ? titleTemplate : ""}
                                ${desc ? descTemplate : ""}
                                ${img ? imgTemplate : ""}
                            </div>
                        </div>
                    </div>`;

	return template;
}