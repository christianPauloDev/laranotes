const baseUrlSpending = "api/spending";

function getSpending(url, filter = false) 
{
    if (filter) {
        $(".spending_card").hide();
    } else {
        $(".spending_card").show();
    }

    $.get(url, function(retorno) {
        $(`.spending_category`).html("");
        
        retorno.map((spent) => {
            $(`#spending_card_${spent.category_fk}`).show();

            $(`#spending_category_${spent.category_fk}`).append(`
                <li class="list-group-item">
                    <div class="row">
                        <div class="col-8">
                            <strong>
                                `
                                +(Number(spent.total_spent)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })+
                                `
                            </strong>
                            <span> 
                                ${(spent.description === null) ? "" : " - "+spent.description} 
                            </span>
                        </div>
                        <div class="col-4 text-right">
                            <i class="fas fa-calendar"></i> ${spent.closing_date}
                        </div>
                    </div>
                </li>
            `);
        });
    });
}

function spendingByFilters()
{
    const category_select = $('#category_select').val();
    const period_select = $('#period_select').val();

    let url = baseUrlSpending;
    let filter = true;
    
    if (category_select != '0' && period_select != '') {
        url += `/allFilters/${category_select}/${period_select}`;
    } else if (category_select != '0') {
        url += `/byCategory/${category_select}`;
    } else if (period_select != '') {
        url += `/byPeriod/${period_select}`;
    } else {
        filter = false;
    }

    getSpending(url, filter);
};

function spentAdd(category_id, category_title)
{
    $("#category_title_add").text(category_title);
    $("#btn-spendingAdd").val(category_id)
}

$("#category_select,#period_select").change(function() {
    spendingByFilters();
});

$("#btn-spendingAdd").click(function() {
    const data = {
        category_fk: $("#btn-spendingAdd").val(),
        description: $("#spendDescription").val(),
        total_spent: $("#spendTotal").val(),
        closing_date: $("#spendDate").val(),
    }

    $.ajax({
        url: baseUrlSpending,
        method: 'POST',
        data
    }) 
    .done(function() {
        spendingByFilters();
    });
});