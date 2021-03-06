from collections import OrderedDict

from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class UserPagination(PageNumberPagination):
    page_size = 30
    page_query_param = 'page_size'
    max_page_size = 1000

    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('count', self.page.paginator.count),
            ('current_page', self.page.number),
            ('next', self.get_next_link()),
            ('previous', self.get_previous_link()),
            ('results', data)
        ]))
