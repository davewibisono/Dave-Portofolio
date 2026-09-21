const totalPages = 10;
let currentPage = 1;

function generatePagination() {
  const paginContainer = $("#pagin ul");
  paginContainer.empty();

  const isMobile = window.innerWidth < 576;
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  // Tombol navigasi awal
  paginContainer.append(
    `<li class="first ${isFirstPage ? "disabled" : ""}"><a href="#">«</a></li>`
  );
  paginContainer.append(
    `<li class="prev ${isFirstPage ? "disabled" : ""}"><a href="#"><</a></li>`
  );

  if (isMobile) {
    // === MOBILE MODE (2 angka max, 1 elipsis max) ===
    if (currentPage === 1 || currentPage === totalPages) {
      // Kasus page 1 atau 10
      paginContainer.append(
        `<li class="${
          currentPage === 1 ? "active" : ""
        }"><a href="#">1</a></li>`
      );
      paginContainer.append(`<li><span>...</span></li>`);
      paginContainer.append(
        `<li class="${
          currentPage === totalPages ? "active" : ""
        }"><a href="#">${totalPages}</a></li>`
      );
    } else if (currentPage === totalPages - 1) {
      // Page 9: tampilkan 9, 10
      paginContainer.append(
        `<li class="active"><a href="#">${currentPage}</a></li>`
      );
      paginContainer.append(`<li><a href="#">${totalPages}</a></li>`);
    } else {
      // Page 2–8
      paginContainer.append(
        `<li class="active"><a href="#">${currentPage}</a></li>`
      );
      paginContainer.append(`<li><span>...</span></li>`);
      paginContainer.append(`<li><a href="#">${totalPages}</a></li>`);
    }
  } else {
    // === DESKTOP MODE (max 4 angka + elipsis bila perlu) ===

    // Always show page 1
    paginContainer.append(
      `<li class="${currentPage === 1 ? "active" : ""}"><a href="#">1</a></li>`
    );

    if (currentPage > 3 && currentPage < totalPages - 2) {
      // Tengah
      paginContainer.append(`<li><span>...</span></li>`);
      paginContainer.append(`<li><a href="#">${currentPage - 1}</a></li>`);
      paginContainer.append(
        `<li class="active"><a href="#">${currentPage}</a></li>`
      );
      paginContainer.append(`<li><a href="#">${currentPage + 1}</a></li>`);
      paginContainer.append(`<li><span>...</span></li>`);
    } else if (currentPage <= 3) {
      // Awal
      for (let i = 2; i <= Math.min(3, totalPages - 1); i++) {
        paginContainer.append(
          `<li class="${
            currentPage === i ? "active" : ""
          }"><a href="#">${i}</a></li>`
        );
      }
      if (totalPages > 4) paginContainer.append(`<li><span>...</span></li>`);
    } else if (currentPage >= totalPages - 2) {
      // Akhir
      if (totalPages > 4) paginContainer.append(`<li><span>...</span></li>`);
      for (let i = totalPages - 2; i < totalPages; i++) {
        if (i > 1) {
          paginContainer.append(
            `<li class="${
              currentPage === i ? "active" : ""
            }"><a href="#">${i}</a></li>`
          );
        }
      }
    }

    // Page terakhir
    if (totalPages > 1) {
      paginContainer.append(
        `<li class="${
          currentPage === totalPages ? "active" : ""
        }"><a href="#">${totalPages}</a></li>`
      );
    }
  }

  // Tombol navigasi akhir
  paginContainer.append(
    `<li class="next ${isLastPage ? "disabled" : ""}"><a href="#">></a></li>`
  );
  paginContainer.append(
    `<li class="last ${isLastPage ? "disabled" : ""}"><a href="#">»</a></li>`
  );

  attachPaginationEvents();
  showPage(currentPage - 1);
}

function attachPaginationEvents() {
  $("#pagin li a")
    .off("click")
    .on("click", function (e) {
      e.preventDefault();
      const val = $(this).text();
      if (val === "«") currentPage = 1;
      else if (val === "<") currentPage = Math.max(1, currentPage - 1);
      else if (val === ">") currentPage = Math.min(totalPages, currentPage + 1);
      else if (val === "»") currentPage = totalPages;
      else currentPage = parseInt(val);

      generatePagination();
    });
}

function showPage(index) {
  $(".content-pagination").hide().eq(index).show();
}

$(document).ready(function () {
  generatePagination();
  $(window).on("resize", generatePagination); // Responsif saat resize
});
